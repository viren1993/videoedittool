// const subaccountDelete = async () => {
//   try {
//     const res = await fetch(`${DATA_API}/company/${companyid}/`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (res.status === 200) {
//       onDelete;
//       toast.success(<Text as="b">Company delete successfully</Text>);
//       setState({
//         isCall: true,
//         table: "company-call",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
