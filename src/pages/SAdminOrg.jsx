import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import "../App.css";
import OrganisationForm from "./components/OrganisationForm";
import ViewOrganisation from "./components/ViewOrganisation";

export default function SAdminOrg() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const actionFromParams = searchParams.get("action") || "Create";
  const orgId = searchParams.get("orgId");

  const [action, setAction] = useState(actionFromParams);
  const [orgData, setOrgData] = useState(null);

  useEffect(() => {
    if (action === "Update" && orgId) {
      const fetchOrgData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/org/${orgId}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(
              data.message || "Failed to fetch organization data"
            );
          }

          setOrgData(data.organization);

          // Reset the URL to /sadminorg after fetching the data
          navigate("/sadminorg", { replace: true });
        } catch (error) {
          console.error("Error fetching organization data:", error);
        }
      };

      fetchOrgData();
    }
  }, [action, orgId, navigate]);

  return (
    <div id="container" className="flex column">
      <Navbar />
      <div className="section flex column">
        <div className="headingBar flex row spacebetween">
          <p className="sectionHeading">Organisations</p>
          <div className="flex row">
            <button
              className="btn whiteBtn rounded"
              onClick={() => setAction("Create")}
            >
              Create Organisation
            </button>
            <button
              className="btn whiteBtn rounded"
              onClick={() => setAction("View")}
            >
              Organisation Management
            </button>
          </div>
        </div>
        {action === "Create" && <OrganisationForm type="Create" />}
        {action === "Update" && orgData && (
          <OrganisationForm type="Update" orgData={orgData} />
        )}
        {action === "View" && <ViewOrganisation />}
      </div>
    </div>
  );
}
