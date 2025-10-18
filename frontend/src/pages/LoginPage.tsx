import React, { useState } from 'react'
import { useAuthStore } from '../stores/useAuthStore';
import { Link } from "react-router-dom";

import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
    const login = useAuthStore((state) => state.login);
    const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* Left side */}
            <div className="flex flex-col gap-4 p-6 md:p-10">
                {/* Logo */}
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        WMS Inc.
                    </a>
                </div>
                {/* Form */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="bg-muted relative hidden lg:flex items-center justify-center">
                <img
                    src="/services-graphic.png"
                    alt="Image"
                    className="max-w-2xl w-[85%] object-contain"
                />
            </div>
        </div>
    )
}

