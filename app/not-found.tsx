'use client'

import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/logo";

const NotFoundPage = () => {
    return ( 
    <div className="flex flex-col items-center justify-center min-h-screen">
        <Logo priority={true} />
        <div className="p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Not Found</h1>
            <p className="text-destructive">Could not find request page</p>
            <Button variant='outline' className="mt-4 ml-2" onClick={()=>(window.location.href = '/')}>Back To Home</Button>
        </div>
    </div>
    );
}
 
export default NotFoundPage;
