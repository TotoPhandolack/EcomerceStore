import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Logo from "@/components/shared/logo";

export const metadata: Metadata = {
    title:'Sign In'
}

const SignInPage = async (props: {
    searchParams:Promise<{
    callbackUrl:string
}>
}) => {

    const {callbackUrl} = await props.searchParams

    const session = await auth()

        if(session){
            return redirect(callbackUrl || '/')
        }

    return ( 
    <div className="w-full max-w-max mx-auto">
        <Card className="w-xl">
            <CardHeader className="space-y-4">
                <Link href="/"className='flex-center'>
                <Logo width={115} height={115} priority={true} />
                </Link>
                <CardTitle className="text-center">
                    Sign In
                </CardTitle>
                <CardDescription className="text-center">
                    Sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* FORM HERE */}
                <CredentialsSignInForm/>

            </CardContent>
        </Card>
    </div> );
}
 
export default SignInPage;
