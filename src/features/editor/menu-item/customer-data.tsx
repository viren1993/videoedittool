"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dispatch } from "@designcombo/events";
import { ADD_TEXT, ADD_ITEMS } from "@designcombo/state";
import { generateId } from "@designcombo/timeline";
import {
  Image,
  Type,
  Building2,
  User,
  Phone,
  MapPin,
  Mail,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";
import {
  useCustomerDataStore,
  type CustomerData as CustomerDataType,
} from "../store/use-customer-data-store";
import { DEFAULT_FONT } from "../constants/font";

interface CustomerField {
  key: string;
  label: string;
  value: string;
  type: "text" | "image";
  icon: LucideIcon;
  path: string;
}

const generateCustomerFields = (
  data: CustomerDataType | null
): CustomerField[] => {
  if (!data) return [];

  const fields: CustomerField[] = [];

  if (data.customer_company_name) {
    fields.push({
      key: "customer_company_name",
      label: "Customer Company",
      value: data.customer_company_name,
      type: "text",
      icon: Building2,
      path: "customer_company_name",
    });
  }

  if (data.full_name) {
    fields.push({
      key: "full_name",
      label: "Full Name",
      value: data.full_name,
      type: "text",
      icon: User,
      path: "full_name",
    });
  }

  if (data.logo_url) {
    fields.push({
      key: "logo_url",
      label: "Customer Logo",
      value: data.logo_url,
      type: "image",
      icon: Image,
      path: "logo_url",
    });
  }

  if (data.city) {
    fields.push({
      key: "city",
      label: "City",
      value: data.city,
      type: "text",
      icon: MapPin,
      path: "city",
    });
  }

  if (data.phone_number) {
    fields.push({
      key: "phone_number",
      label: "Phone Number",
      value: data.phone_number,
      type: "text",
      icon: Phone,
      path: "phone_number",
    });
  }

  if (data.address) {
    fields.push({
      key: "address",
      label: "Address",
      value: data.address,
      type: "text",
      icon: MapPin,
      path: "address",
    });
  }

  if (data.user?.email) {
    fields.push({
      key: "user.email",
      label: "User Email",
      value: data.user.email,
      type: "text",
      icon: Mail,
      path: "user.email",
    });
  }

  if (data.company?.company_name) {
    fields.push({
      key: "company.company_name",
      label: "Company Name",
      value: data.company.company_name,
      type: "text",
      icon: Building2,
      path: "company.company_name",
    });
  }

  if (data.company?.logo_url) {
    fields.push({
      key: "company.logo_url",
      label: "Company Logo",
      value: data.company.logo_url,
      type: "image",
      icon: Image,
      path: "company.logo_url",
    });
  }

  if (data.company?.description) {
    fields.push({
      key: "company.description",
      label: "Company Description",
      value: data.company.description,
      type: "text",
      icon: Type,
      path: "company.description",
    });
  }

  if (data.company?.mobile) {
    fields.push({
      key: "company.mobile",
      label: "Company Mobile",
      value: data.company.mobile,
      type: "text",
      icon: Phone,
      path: "company.mobile",
    });
  }

  if (data.company?.email) {
    fields.push({
      key: "company.email",
      label: "Company Email",
      value: data.company.email,
      type: "text",
      icon: Mail,
      path: "company.email",
    });
  }

  return fields;
};

export const CustomerData = () => {
  const customerData = useCustomerDataStore((state) => state.customerData);
  const setCustomerData = useCustomerDataStore(
    (state) => state.setCustomerData
  );

  const customerFields = useMemo(
    () => generateCustomerFields(customerData),
    [customerData]
  );

  const handleAddTextField = (field: CustomerField) => {
    dispatch(ADD_TEXT, {
      payload: {
        id: generateId(),
        display: {
          from: 0,
          to: 5000,
        },
        type: "text",
        name: field.label,
        details: {
          text: `{{${field.path}}}`,
          fontSize: 40, // change default size as required
          width: 600,
          fontUrl: DEFAULT_FONT.url,
          fontFamily: DEFAULT_FONT.postScriptName,
          color: "#ffffff",
          wordWrap: "break-word",
          textAlign: "left",
          borderWidth: 0,
          borderColor: "#000000",
          boxShadow: {
            color: "#00000000",
            x: 0,
            y: 0,
            blur: 0,
          },
        },
        metadata: {
          isCustomerField: true,
          fieldPath: field.path,
          fieldLabel: field.label,
          defaultValue: field.label,
          isLocked: false,
          dataType: "text",
        },
      },
      options: {},
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
              to: 5000,
            },
            details: {
              src: field.value,
            },
            metadata: {
              isCustomerField: true,
              fieldPath: field.path,
              fieldLabel: field.label,
              defaultValue: field.label,
              isLocked: false,
              dataType: "image",
            },
          },
        ],
      },
    });
  };

  const handleLoadSampleData = () => {
    setCustomerData({
      customer_company_name: "parmar and sons",
      full_name: "navneet parmar",
      logo_url:
        "https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w",
      city: "Gujrati",
      phone_number: "1234657890",
      telephone_number: "1234567890",
      address:
        "1st Floor Shivanjali Society, Dr Ambedkar Road, Off Carter Rd, near Ambedkar Statue, Khar West, Mumbai, Maharashtra 400052, India",
      user: {
        email: "navneet007@gmail.com",
      },
      company: {
        company_name: "TechVision Pvt LLP",
        description:
          "We specialize in smart construction automation and site management systems.",
        mobile: "+91-1234567890",
        logo_url:
          "https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w",
        email: "info@telecom.com",
      },
    });
  };

  const textFields = customerFields.filter((f) => f.type === "text");
  const imageFields = customerFields.filter((f) => f.type === "image");

  if (!customerData) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="text-text-primary flex h-12 flex-none items-center px-4 text-sm font-medium">
          Customer Data
        </div>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            No customer data loaded. Load customer data to insert dynamic fields
            into your template.
          </p>
          <Button onClick={handleLoadSampleData} variant="outline">
            Load Sample Data
          </Button>
        </div>
      </div>
    );
  }

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
                  className="flex-1 justify-start gap-2 h-auto py-2"
                  onClick={() => handleAddTextField(field)}
                >
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-sm">{field.label}</span>
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
                  className="flex-1 justify-start gap-2 h-auto py-2"
                  onClick={() => handleAddImageField(field)}
                >
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col items-start flex-1">
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
