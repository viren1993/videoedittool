// const onSubmit: SubmitHandler<CreateCompanyInput> = async (data) => {
//   setLoading(true);
//   setErrorMsg(null);

//   try {
//     const formData = new FormData();
//     formData.append("company_name", data.company_name);
//     formData.append("email", data.email);
//     formData.append("mobile", data.mobile);
//     formData.append("username", data.username);
//     formData.append("password", data.password);
//     formData.append("description", data.description || "");
//     formData.append("status", data.status ? "active" : "inactive");
//     formData.append("website", data.website || "");

//     // Handle file upload
//     if (data.logo_file && data.logo_file.length > 0) {
//       formData.append("logo_file", data.logo_file[0]);
//     }

//     const response = await axios.post(`${DATA_API}/company`, formData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (response.status === 200 || response.status === 201) {
//       toast.success("Company created successfully!");
//       closeModal();
//       setState({
//         isCall: false,
//         table: "company-call",
//       });
//     }
//   } catch (err: any) {
//     const errorMessage =
//       err.response?.data?.detail?.msg ||
//       err.response?.data?.message ||
//       err.response?.data?.error ||
//       err.response?.data?.detail ||
//       err.message ||
//       "Failed to create company";

//     setErrorMsg(errorMessage);
//     toast.error(errorMessage);
//   } finally {
//     setLoading(false);
//   }
// };
