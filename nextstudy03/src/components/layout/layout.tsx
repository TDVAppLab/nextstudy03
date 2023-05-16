import { ReactNode, useEffect } from "react";
import NavBar from "./NavBar";
import { getCsrfToken, useSession } from "next-auth/react";
import { useStore } from "@/app/stores/store";

interface Props {
  children: ReactNode;
}

export default function Layout({ children } : Props) {

  const {commonStore} = useStore();
  
  const { data: session } = useSession();
  
  useEffect(() => {
    if (session) {
      console.log("successfully sign in session : ");
      console.log(session);
      
      getCsrfToken().then((token) => {
        console.log("token : ");
        console.log(token);
        if(token){
          commonStore.setToken(token);
        }
      })

    }
  }, [session]);

  
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}