import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useTokenVerification = () => {
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading1, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl=import.meta.env.VITE_API_URL;
const [user,setUser]=useState([])
useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setIsVerified(false);
      setIsLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/verify`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setIsVerified(true); 
          setIsLoading(true);
        setUser(result.user)
        Cookies.set('Aid', result.user.AdminID);
        } else {
          setIsVerified(false); 
          localStorage.removeItem("adminToken"); 
        }
      } catch (error) {
        console.error("Error verifying token:");
        setIsVerified(false); 
        localStorage.removeItem("adminToken"); 
      } finally {
        setIsLoading(false); 
      }
    };
    verifyToken();
  }, []);

  return { isVerified, user,isLoading1, error,setUser,setIsVerified,setIsLoading };
};

export default useTokenVerification;
