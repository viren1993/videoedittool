import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dispatch } from "@designcombo/events";
import { ADD_TEXT, ADD_ITEMS } from "@designcombo/state";
import { generateId } from "@designcombo/timeline";
import { nanoid } from "nanoid";
import { Image, Type, Building2, User, Phone, MapPin, Mail } from "lucide-react";

// Sample customer data structure - this would come from props or context in production
const SAMPLE_CUSTOMER_DATA = {
  customer_company_name: "parmar and sons",
  full_name: "navneet parmar",
  logo_url: "navneet007/22a6fedd50fb442f92b269d7874e572f_EdgeKart.png",
  city: "Gujrati",
  phone_number: "1234657890",
  telephone_number: "1234567890",
  address: "1st Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
  user: {
    username: "navneet007",
    email: "navneet007@gmail.com",
  },
  company: {
    company_name: "TechVision Pvt LLP",
    description: "We specialize in smart construction automation and site management systems.",
    mobile: "+91-1234567890",
    logo_url: "logo.jpg",
    email: "info@telecom.com",
  },
};

interface CustomerField {
  key: string;
  label: string;
  value: string;
  type: "text" | "image";
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

// Generate dynamic fields from customer data
const generateCustomerFields = (data: typeof SAMPLE_CUSTOMER_DATA): CustomerField[] => {
  const fields: CustomerField[] = [];

  // Customer direct fields
  if (data.customer_company_name) {
    fields.push({
      key: "customer_company_name",
      label: "Customer Company",
      value: data.customer_company_name,
      type: "text",
      icon: Building2,
      path: "customer_company_name"
    });
  }

  if (data.full_name) {
    fields.push({
      key: "full_name",
      label: "Full Name",
      value: data.full_name,
      type: "text",
      icon: User,
      path: "full_name"
    });
  }

  if (data.logo_url) {
    fields.push({
      key: "logo_url",
      label: "Customer Logo",
      value: data.logo_url,
      type: "image",
      icon: Image,
      path: "logo_url"
    });
  }

  if (data.city) {
    fields.push({
      key: "city",
      label: "City",
      value: data.city,
      type: "text",
      icon: MapPin,
      path: "city"
    });
  }

  if (data.phone_number) {
    fields.push({
      key: "phone_number",
      label: "Phone Number",
      value: data.phone_number,
      type: "text",
      icon: Phone,
      path: "phone_number"
    });
  }

  if (data.address) {
    fields.push({
      key: "address",
      label: "Address",
      value: data.address,
      type: "text",
      icon: MapPin,
      path: "address"
    });
  }

  // User nested fields
  if (data.user?.username) {
    fields.push({
      key: "user.username",
      label: "Username",
      value: data.user.username,
      type: "text",
      icon: User,
      path: "user.username"
    });
  }

  if (data.user?.email) {
    fields.push({
      key: "user.email",
      label: "User Email",
      value: data.user.email,
      type: "text",
      icon: Mail,
      path: "user.email"
    });
  }

  // Company nested fields
  if (data.company?.company_name) {
    fields.push({
      key: "company.company_name",
      label: "Company Name",
      value: data.company.company_name,
      type: "text",
      icon: Building2,
      path: "company.company_name"
    });
  }

  if (data.company?.logo_url) {
    fields.push({
      key: "company.logo_url",
      label: "Company Logo",
      value: data.company.logo_url,
      type: "image",
      icon: Image,
      path: "company.logo_url"
    });
  }

  if (data.company?.description) {
    fields.push({
      key: "company.description",
      label: "Company Description",
      value: data.company.description,
      type: "text",
      icon: Type,
      path: "company.description"
    });
  }

  if (data.company?.mobile) {
    fields.push({
      key: "company.mobile",
      label: "Company Mobile",
      value: data.company.mobile,
      type: "text",
      icon: Phone,
      path: "company.mobile"
    });
  }

  if (data.company?.email) {
    fields.push({
      key: "company.email",
      label: "Company Email",
      value: data.company.email,
      type: "text",
      icon: Mail,
      path: "company.email"
    });
  }

  return fields;
};

const CUSTOMER_FIELDS = generateCustomerFields(SAMPLE_CUSTOMER_DATA);

export const CustomerData = () => {
  const handleAddTextField = (field: CustomerField) => {
    dispatch(ADD_TEXT, {
      payload: {
        id: nanoid(),
        type: "text",
        name: field.label,
        details: {
          text: `{{${field.path}}}`,
          fontSize: 48,
          fontFamily: "Inter",
          fontWeight: 400,
          color: "#ffffff",
        },
        metadata: {
          isCustomerField: true,
          fieldPath: field.path,
          fieldLabel: field.label,
        }
      },
      options: {}
    });
  };

  const handleAddImageField = (field: CustomerField) => {
    const id = generateId();
    dispatch(ADD_ITEMS, {
      payload: {
        trackItems: [
          {
            id,
            type: "image",
            name: field.label,
            display: {
              from: 0,
              to: 5000
            },
            details: {
              src: `{{${field.path}}}`,
            },
            metadata: {
              isCustomerField: true,
              fieldPath: field.path,
              fieldLabel: field.label,
            }
          }
        ]
      }
    });
  };

  const textFields = CUSTOMER_FIELDS.filter(f => f.type === "text");
  const imageFields = CUSTOMER_FIELDS.filter(f => f.type === "image");

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-text-primary flex h-12 flex-none items-center px-4 text-sm font-medium">
        Customer Data
      </div>
      <ScrollArea className="flex-1 lg:max-h-[calc(100%-48px)] max-h-[500px]">
        <div className="px-4 pb-4">
          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
            Text Fields
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {textFields.map((field) => {
              const IconComponent = field.icon;
              return (
                <Button
                  key={field.key}
                  variant="outline"
                  className="justify-start gap-2 h-auto py-2"
                  onClick={() => handleAddTextField(field)}
                >
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{field.label}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {field.value}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>

          <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
            Image Fields
          </div>
          <div className="flex flex-col gap-2">
            {imageFields.map((field) => {
              const IconComponent = field.icon;
              return (
                <Button
                  key={field.key}
                  variant="outline"
                  className="justify-start gap-2 h-auto py-2"
                  onClick={() => handleAddImageField(field)}
                >
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{field.label}</span>
                    <span className="text-xs text-muted-foreground">
                      Click to insert
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
