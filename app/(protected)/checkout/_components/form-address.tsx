"use client";

import ErrorMessages from "@/components/error-message";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {UserAddressForm, userAddressSchema} from "@/schemas/user-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Cookies from "js-cookie";
import {addUserAddress} from "@/app/actions/users";
import {getUser} from "@/app/actions/auth";
import {UserType} from "@/types/user";

const FormAddress = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState<
    UserType | null | undefined
  >(null);

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UserAddressForm>({
    resolver: zodResolver(userAddressSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setAuthenticatedUser(user);
    };

    fetchUser();
  }, []);

  const handleSubmitAddress = async (data: UserAddressForm) => {
    if (!authenticatedUser) {
      setError("User belum terautentikasi.");
      return;
    }

    const newUser = {
      email: authenticatedUser.email,
      newAddress: {...data, details: data.details ?? ""},
    };

    const result = await addUserAddress(newUser);
    Cookies.set("user", JSON.stringify(result.user));

    if (result.success) {
      setAuthenticatedUser(result.user);
    }
  };

  return (
    <div>
      <h3 className='text-xl font-semibold mb-8'>Alamat</h3>
      {authenticatedUser?.address && Cookies.get("user") ? (
        <div className='bg-gray-50 rounded-lg p-4'>
          <div className='grid gap-2'>
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <h4 className='font-semibold'>
                  {authenticatedUser?.address?.fullName}
                </h4>
                <p>(Alamat Utama)</p>
              </div>
              <Button className='bg-100'>Ubah</Button>
            </div>
            <div className='text-sm'>
              <p>{authenticatedUser?.address?.phone}</p>
              <p>{authenticatedUser?.address?.fullAddress}</p>
            </div>
          </div>
        </div>
      ) : (
        <form
          action=''
          method='post'
          onSubmit={handleSubmit(handleSubmitAddress)}
        >
          <div className='grid gap-y-4 w-full'>
            <div>
              <Input
                type='text'
                placeholder='Masukkan nama lengkap'
                {...register("fullName")}
              />
              {errors.fullName && (
                <ErrorMessages errors={errors.fullName.message} />
              )}
            </div>
            <div>
              <Input
                type='tel'
                placeholder='Masukkan nomor telepon'
                {...register("phone")}
              />
              {errors.phone && <ErrorMessages errors={errors.phone.message} />}
            </div>
            <div>
              <Textarea
                rows={5}
                placeholder='Masukkan alamat lengkap'
                {...register("fullAddress")}
              />
              <span className='text-[13px] text-gray-500'>
                Contoh: Jalan, RT/RW, Dusun, Desa, Kecamatan, Kabupaten/Kota,
                Provinsi
              </span>
              {errors.fullAddress && (
                <ErrorMessages errors={errors.fullAddress.message} />
              )}
            </div>
            <div>
              <Input
                type='tel'
                {...register("details")}
                placeholder='Detail lainnya (opsional)'
              />
              <span className='text-[13px] text-gray-500'>
                Contoh: No. rumah, Kos, Kantor
              </span>
              {errors.details && (
                <ErrorMessages errors={errors.details.message} />
              )}
            </div>
          </div>
          <Button className='w-full mt-6'>Simpan Alamat</Button>
          {error && <ErrorMessages errors={error} />}
        </form>
      )}
    </div>
  );
};

export default FormAddress;
