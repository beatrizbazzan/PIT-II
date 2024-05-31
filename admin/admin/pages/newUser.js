import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewUser() {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    axios.get('/api/newUser').then(response => {
      setUsers(response.data);
    });
  }, []);

  return (
    <Layout>
      <div>users</div>
      {console.log("users",users)}
    </Layout>
  );
}
