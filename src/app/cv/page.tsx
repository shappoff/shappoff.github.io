import {Metadata} from "next";
import CVPageComponent from "@/components/featured/CVPageComponent";


export const metadata: Metadata = {
    title: "CV Sergey Shappo",
    description: `Online CV and professional portfolio of Sergey Shappo, a Senior Frontend Developer with ${new Date().getFullYear() - 2015} years of experience in Web Development. Explore my work history, projects, and skills.`,
};

export default function CVPage() {
    const cvIframeSrc = "https://docs.google.com/document/d/e/2PACX-1vQgKeSmErdc6YbPvE7_qcjZ4JMjWzJfM6ArojNNhvrOMBp3SB84nLk1TJJRy1T0aiEjXfsBJ3yBxIH_/pub?embedded=true"

    return <CVPageComponent src={cvIframeSrc} />
}
