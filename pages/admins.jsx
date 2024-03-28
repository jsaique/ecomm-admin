/* eslint-disable react/jsx-key */
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { formatDate } from "@/lib/date";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function AdminsPage({ swal }) {
  const [email, setEmail] = useState("");
  const [adminEmails, setEmailAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addAdmin(e) {
    e.preventDefault();
    axios
      .post("/api/admins", { email })
      .then((res) => {
        console.log(res.data);
        swal.fire({
          title: "Admin added!",
          icon: "success",
        });
        setEmail("");
        loadAdmins();
      })
      .catch((err) => {
        swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
        });
        setEmail("");
      });
  }

  function deleteAdmin(_id, email) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete admin ${email}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes Delete!",
        reverseButtons: true,
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          axios.delete("/api/admins?_id=" + _id).then(() => {
            swal.fire({
              title: "Admin deleted",
              icon: "success",
            });
            loadAdmins();
          });
        }
      });
  }

  function loadAdmins() {
    setIsLoading(true);
    axios.get("/api/admins").then((res) => {
      setEmailAdmins(res.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  return (
    <Layout>
      <h1>Administrators</h1>
      <h2>Add new admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input
            className="mb-0"
            type="text"
            placeholder="@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            Add
          </button>
        </div>
      </form>
      <h2>Existing admins</h2>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-left">Admin Email </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {adminEmails.length > 0 &&
            adminEmails.map((adminEmail) => (
              <tr key={adminEmail._id}>
                <td>{adminEmail.email}</td>
                <td>
                  {adminEmail.createdAt && formatDate(adminEmail.createdAt)}
                </td>
                <td>
                  <button
                    onClick={() =>
                      deleteAdmin(adminEmail._id, adminEmail.email)
                    }
                    className="btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }) => <AdminsPage swal={swal} />);
