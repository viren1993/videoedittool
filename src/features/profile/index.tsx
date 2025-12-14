"use client";

import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return null;
  const role = user.role;
  const profile = user.profile;

  return (
    <div className="grid gap-4 divide-y divide-dashed divide-gray-300 rounded-lg border border-gray-400 p-3">
      {role === "superadmin" ? (
        <>
          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize">
                User Name
              </Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal bold">
                {profile?.username}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize">Email</Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal bold">
                {profile?.email}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize">Role</Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal capitalize bold">
                {role}
              </Text>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* COMPANY VIEW */}
          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize">
                Company Name
              </Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal bold">
                {profile?.company_name}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize">
                {" "}
                User Name
              </Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal bold">
                {profile?.username || profile?.company_name}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize"> Email</Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal bold">
                {profile?.email}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize"> Mobile</Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal bold">
                {profile?.mobile}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 py-2">
            <div className="col-span-4">
              <Text className="font-lg mb-3 text-base capitalize"> Role</Text>
            </div>
            <div className="col-span-4">
              <Text className="text-base font-normal capitalize bold">
                {role}
              </Text>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
