import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FiGithub, FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiSmartphone, FiLinkedin, FiBriefcase } from "react-icons/fi";
import Image from "next/image";
import logo from '../assets/Screenshot (16).png'

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Electronics", href: "/products?category=electronics" },
    { label: "Clothing", href: "/products?category=clothing" },
    { label: "Home & Kitchen", href: "/products?category=home" },
    { label: "Beauty", href: "/products?category=beauty" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Track Order", href: "/track-order" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Newsletter */}
          <div className="space-y-4">
            <Link href="/" className="inline-block flex items-center space-x-2">
              <Image
                src={logo}
                alt="A cool nature photo"
                width={40}
                height={50}
                className="rounded-lg object-cover"
              />
              <span className="text-xl font-bold tracking-tight">DevStore</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Quality products for every lifestyle. Shop with confidence.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  className="max-w-[220px]"
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-12 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevStore. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://portfolio-frontend-92nm.onrender.com/" className="text-muted-foreground hover:text-foreground">
              <FiBriefcase className="h-5 w-5" />
              <span className="sr-only">Portfolio</span>
            </Link>
            <Link href="www.youtube.com/@ThiruSoftCode" className="text-muted-foreground hover:text-foreground">
              <FiYoutube className="h-5 w-5" />
              <span className="sr-only">Youtube</span>
            </Link>
            <Link href="tel:7569583293" className="text-muted-foreground hover:text-foreground">

              <FiSmartphone className="h-5 w-5" />
              <span className="sr-only">Phone</span>
            </Link>
            <Link href="www.linkedin.com/in/charipalli-thirumalesh-a7a127350" className="text-muted-foreground hover:text-foreground">
              <FiLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://github.com/ThiruCoder" className="text-muted-foreground hover:text-foreground">
              <FiGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
