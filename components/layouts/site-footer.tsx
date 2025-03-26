import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-background border-t w-full py-12 md:py-16">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              EduCredit
              <span className="text-foreground">Pro</span>
            </span>
          </Link>
          <p className="text-muted-foreground max-w-xs">
            Connecting education funding with career acceleration through skill
            verification, employer partnerships, and community knowledge
            exchange.
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-base mb-4">Platform</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/marketplace"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="/skill-assessment"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Skill Assessment
              </Link>
            </li>
            <li>
              <Link
                href="/funding"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Funding Options
              </Link>
            </li>
            <li>
              <Link
                href="/career-simulator"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Career Simulator
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Community Exchange
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-base mb-4">For Partners</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/investors"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Investors
              </Link>
            </li>
            <li>
              <Link
                href="/employers"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Employers
              </Link>
            </li>
            <li>
              <Link
                href="/educators"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Educators
              </Link>
            </li>
            <li>
              <Link
                href="/partnerships"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Partnership Programs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-base mb-4">Company</h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/press"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Press
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-12 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduCredit Pro. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-muted-foreground">
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
