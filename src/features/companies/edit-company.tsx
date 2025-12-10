// const onSubmit: SubmitHandler<UpdateCompanyInput> = async (data) => {
//   setLoading(true);
//   setErrorMsg(null);

//   try {
//     const formData = new FormData();
//     formData.append("company_name", data.company_name);
//     formData.append("email", data.email);
//     formData.append("mobile", data.mobile);
//     formData.append("username", data.username);
//     formData.append("status", data.status ? "active" : "inactive");
//     formData.append("description", data.description || "");

//     if (data.logo_file && data.logo_file.length > 0) {
//       formData.append("logo_file", data.logo_file[0]);
//     }

//     formData.forEach((v, k) => console.log(k, v));

//     const res = await fetch(`${DATA_API}/company/${company.company_id}`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: formData,
//     });

//     const response = (await res.json()) as any;

//     if (res.ok) {
//       toast.success(<Text as="b">Company updated successfully!</Text>);
//       closeModal();
//       setState({ isCall: true, table: "company-call" });
//     } else {
//       setErrorMsg(
//         response?.detail?.msg ||
//           response?.detail ||
//           response?.message ||
//           "Failed to update company"
//       );
//       toast.error("Failed to update company");
//     }
//   } catch (error) {
//     setErrorMsg("Something went wrong, please try again.");
//     toast.error("Network error occurred");
//   } finally {
//     setLoading(false);
//   }
// };
