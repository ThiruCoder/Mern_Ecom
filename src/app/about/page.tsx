"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link2, MoreHorizontal } from "lucide-react";
import logo from './Screenshot (16).png'

type Project = {
  image: any;
  id: number;
  title: string;
  description: string;
  url: string
};

type APIResponse = {
  data: Project[]
  message: string,
  success: boolean,

};

export default function AboutPage() {
  const [projects, setProjects] = useState<Project[]>([])

  const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
  const backendTrilUrl = 'http://localhost:5000'
  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const { data } = await axios.get<APIResponse>(`${backendTrilUrl}/projects/allproject`);
        console.log(data);

        setProjects(data.data)
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      }
    };

    getProjectDetails();
  }, []);

  console.log(projects);

  return (
    <div className="container py-10 space-y-20">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About StyleStore
          </h1>
          <p className="text-xl text-muted-foreground">
            We're on a mission to provide high-quality products at affordable prices, with exceptional customer service.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="tel:7569583293">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-square lg:aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop"
            alt="Our Store"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-muted py-16 px-6 rounded-lg">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-lg">
              We believe everyone deserves access to premium products that enhance their lifestyle without breaking the bank.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Quality Products</h3>
                  <p className="text-muted-foreground">
                    We source only the best products that meet our rigorous quality standards.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Affordable Pricing</h3>
                  <p className="text-muted-foreground">
                    We believe premium products should be accessible to everyone.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Customer Satisfaction</h3>
                  <p className="text-muted-foreground">
                    Our top priority is ensuring our customers have an exceptional experience.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative aspect-square lg:aspect-[3/4] max-w-md mx-auto ">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
              alt="Our Mission"
              fill
              className="object-cover rounded-lg"
            />

          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
          <p className="text-lg text-muted-foreground">
            Founded in 2015, StyleStore has grown from a small online boutique to a thriving e-commerce platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary text-lg font-semibold">
              1
            </div>
            <h3 className="text-xl font-semibold">The Beginning</h3>
            <p className="text-muted-foreground">
              Started as a small passion project by our founder, aiming to make premium products accessible to everyone.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary text-lg font-semibold">
              2
            </div>
            <h3 className="text-xl font-semibold">Growth & Expansion</h3>
            <p className="text-muted-foreground">
              Expanded our product range and reached customers across the country, establishing a loyal customer base.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary text-lg font-semibold">
              3
            </div>
            <h3 className="text-xl font-semibold">Today</h3>
            <p className="text-muted-foreground">
              Now a trusted e-commerce destination with thousands of products and a commitment to quality and service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      {/* <section className="space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            The passionate people behind StyleStore who work tirelessly to deliver the best experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop"
                alt="Sarah Johnson"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-primary font-medium">Founder & CEO</p>
            </div>
            <p className="text-muted-foreground">
              With 15 years in retail, Sarah founded StyleStore with a vision to revolutionize online shopping.
            </p>
          </div>

          <div className="space-y-4 text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?q=80&w=2070&auto=format&fit=crop"
                alt="Mark Thompson"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Mark Thompson</h3>
              <p className="text-primary font-medium">Head of Products</p>
            </div>
            <p className="text-muted-foreground">
              Mark ensures all our products meet the highest standards of quality and value for our customers.
            </p>
          </div>

          <div className="space-y-4 text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=2134&auto=format&fit=crop"
                alt="Jennifer Lee"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Jennifer Lee</h3>
              <p className="text-primary font-medium">Customer Experience</p>
            </div>
            <p className="text-muted-foreground">
              Jennifer leads our customer service team, ensuring every interaction exceeds expectations.
            </p>
          </div>

          <div className="space-y-4 text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"
                alt="David Chen"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">David Chen</h3>
              <p className="text-primary font-medium">Tech Lead</p>
            </div>
            <p className="text-muted-foreground">
              David oversees our digital platforms, ensuring a seamless and enjoyable shopping experience.
            </p>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="bg-muted py-16 px-6 rounded-lg space-y-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </div>
        {projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {projects?.map((project, index) => (
              <div className="bg-background p-6 rounded-lg shadow-sm" key={index} >
                <Image
                  src={project?.image?.url}
                  alt="Customer"
                  width={500}
                  height={400}
                  className="object-cover"
                />

                <div className="flex gap-1 mb-4 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={`star-rating-1-${i}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="italic mb-4" key={project?.id} style={{ overflow: 'visible', textOverflow: 'ellipsis', lineClamp: 5, WebkitLineClamp: 5, display: 'webkit-box', WebkitBoxOrient: 'vertical', boxOrient: 'vertical' }}>
                  {project?.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={logo}
                      alt="Customer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex justify-between w-full" >
                    <div>
                      <p className="font-medium">Thirumal</p>
                      <p className="text-sm text-muted-foreground">Fullstack developer</p>
                    </div>
                    <div className="relative">
                      <a href={project?.url}>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 rounded-full"
                        >
                          <Link2 className="w-5 h-15 text-blue-800" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* CTA */}
      <section className="text-center py-10 max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to Experience StyleStore?
        </h2>
        <p className="text-lg text-muted-foreground">
          Join thousands of satisfied customers and discover our premium products at affordable prices.
        </p>
        <Button size="lg" asChild>
          <Link href="/products">
            Shop Now <FiArrowRight className="ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
