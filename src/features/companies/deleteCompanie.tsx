"use client";

import { AlertDialog, Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { Trash2 } from "lucide-react";
import { Company } from "./type";
import { DATA_API } from "@/config/constants";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CompanieDeleteProps {
  data?: Partial<Company>;
  setRefreshApi: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteCompanie({
  data,
  setRefreshApi,
}: CompanieDeleteProps) {
  const { data: session } = useSession();

  const handleDeleteConfirm = async () => {
    if (!data) return; // Prevent crashing
    try {
      const res = await fetch(`${DATA_API}/company/${data.company_id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access_token}`,
        },
      });

      if (res.status === 200) {
        toast.success(
          <Text className="font-semibold">Company deleted successfully</Text>
        );
        setRefreshApi((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return null;

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton color="ruby" variant="soft">
          <Trash2 width="18" height="18" />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Company</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete the company:
          <b> {data.company_name}</b>? This action cannot be undone.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button variant="solid" color="ruby" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
