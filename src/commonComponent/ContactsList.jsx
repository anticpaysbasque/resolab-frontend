// import React, { useEffect, useState } from "react";
// import { List } from "@material-ui/core";
// import axios from "axios";

// import Contact from "./Chat/Contact";

// const apiUrl = process.env.REACT_APP_API_URL;

// function ContactsList({ classes }) {
//     const [contacts, setContacts] = useState([]);

//     useEffect(() => {
//         const fetchDatas = async () => {
//             const res = await axios.get(`${apiUrl}/users`, {
//                 headers: {
//                     Authorization: "Bearer " + sessionStorage.getItem("token"),
//                     Accept: "application/json"
//                 }
//             });
//             setContacts(res.data);
//             setTimeout(() => {
//                 fetchDatas();
//             }, 10000);
//         };
//         fetchDatas();
//     }, []);

//     return (
//         <List>
//             {contacts.map(contact => (
//                 <Contact contact={contact} classes={classes} />
//             ))}
//         </List>
//     );
// }

// export default ContactsList;
