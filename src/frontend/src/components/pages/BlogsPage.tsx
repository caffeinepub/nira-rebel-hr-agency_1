import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Calendar, Clock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../Footer";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  color: string;
  emoji: string;
}

const blogs: BlogPost[] = [
  {
    id: 1,
    title: "How to Crack a Banking Job Interview in India",
    excerpt:
      "Banking jobs are highly competitive. From SBI to PNB to Axis Bank, here are proven tips to stand out — from dressing professionally to preparing for common HR questions about customer service and sales.",
    category: "Interview Tips",
    readTime: "5 min read",
    date: "March 2026",
    color: "oklch(0.55 0.18 255)",
    emoji: "🏦",
  },
  {
    id: 2,
    title: "ATM Operator Career Guide: Roles, Salary & Growth",
    excerpt:
      "ATM operators are in high demand across Hitachi Cash Management Services and banking companies. Understand the job scope, daily responsibilities, salary expectations, and how to advance to Team Leader.",
    category: "Career Guide",
    readTime: "6 min read",
    date: "February 2026",
    color: "oklch(0.65 0.2 30)",
    emoji: "💰",
  },
  {
    id: 3,
    title:
      "E-Commerce Warehouse Jobs: What to Expect at Blinkit, Swiggy & Amazon",
    excerpt:
      "The booming quick-commerce sector offers thousands of jobs for freshers. Learn about picker, packer, and inventory associate roles at Blinkit, Zepto, Swiggy, Flipkart, and Amazon warehouses.",
    category: "Industry Insights",
    readTime: "4 min read",
    date: "February 2026",
    color: "oklch(0.72 0.18 75)",
    emoji: "📦",
  },
  {
    id: 4,
    title: "Top 10 Tips for Freshers Entering the Job Market",
    excerpt:
      "Whether you're applying for a clerk position at PNB Bank or a floor coordinator role at SBI, these 10 actionable tips will give you the edge: resume writing, punctuality, communication skills, and more.",
    category: "Career Tips",
    readTime: "7 min read",
    date: "January 2026",
    color: "oklch(0.58 0.18 200)",
    emoji: "🎓",
  },
  {
    id: 5,
    title: "Metro Jobs in Delhi: Opportunities & Eligibility",
    excerpt:
      "Delhi Metro offers diverse roles from TOM operators and customer service staff to security guards and housekeeping teams. Find out educational requirements, age limits, and how to apply through registered agencies.",
    category: "Job Spotlight",
    readTime: "5 min read",
    date: "January 2026",
    color: "oklch(0.6 0.22 270)",
    emoji: "🚇",
  },
  {
    id: 6,
    title: "Credit Card Sales Careers: Skills, Targets & Rewards",
    excerpt:
      "Credit card opening roles at banks like SBI, PNB, and Axis Bank are fast-paced and reward-driven. Understand the KPIs, incentive structures, and what makes a top performer in field sales.",
    category: "Sales Careers",
    readTime: "5 min read",
    date: "December 2025",
    color: "oklch(0.55 0.2 140)",
    emoji: "💳",
  },
];

const categories = [
  "All",
  "Interview Tips",
  "Career Guide",
  "Industry Insights",
  "Career Tips",
  "Job Spotlight",
  "Sales Careers",
];

export default function BlogsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.005 240)" }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.12 0.06 258) 0%, oklch(0.18 0.06 255) 50%, oklch(0.22 0.07 250) 100%)",
        }}
      >
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                backgroundColor: "oklch(0.78 0.16 75 / 0.15)",
                color: "oklch(0.78 0.16 75)",
                border: "1px solid oklch(0.78 0.16 75 / 0.3)",
              }}
            >
              <BookOpen className="w-3 h-3" />
              Career Insights
            </div>
            <h1
              className="font-display font-bold text-3xl md:text-5xl mb-3"
              style={{ color: "oklch(0.98 0 0)" }}
            >
              HR & Career Blog
            </h1>
            <p
              className="text-base md:text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.78 0.04 240)" }}
            >
              Expert tips, industry news, and career guidance for job seekers
              across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Tags */}
      <section
        className="py-6 border-b"
        style={{ borderColor: "oklch(0.9 0.01 240)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Badge
                key={cat}
                className="px-3 py-1 text-xs font-semibold rounded-full cursor-default"
                style={{
                  backgroundColor:
                    cat === "All"
                      ? "oklch(0.18 0.06 255)"
                      : "oklch(0.78 0.16 75 / 0.08)",
                  color:
                    cat === "All" ? "oklch(0.99 0 0)" : "oklch(0.45 0.12 70)",
                  border: `1px solid ${cat === "All" ? "transparent" : "oklch(0.78 0.16 75 / 0.2)"}`,
                }}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((post, i) => (
              <motion.div
                key={post.id}
                data-ocid={`blogs.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  className="h-full overflow-hidden cursor-pointer border hover:shadow-xl transition-all"
                  style={{ borderColor: "oklch(0.88 0.01 240)" }}
                >
                  {/* Colored emoji header */}
                  <div
                    className="h-28 flex items-center justify-center text-5xl"
                    style={{
                      background: `linear-gradient(135deg, ${post.color} 0%, ${post.color}80 100%)`,
                    }}
                  >
                    {post.emoji}
                  </div>

                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        className="text-xs font-semibold rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: `${post.color}18`,
                          color: post.color,
                          border: `1px solid ${post.color}40`,
                        }}
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <h3
                      className="font-bold text-sm md:text-base leading-snug"
                      style={{ color: "oklch(0.18 0.06 255)" }}
                    >
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent>
                    <p
                      className="text-xs md:text-sm leading-relaxed line-clamp-3 mb-4"
                      style={{ color: "oklch(0.5 0.02 240)" }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className="flex items-center gap-4 text-xs"
                      style={{ color: "oklch(0.65 0.03 240)" }}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12"
        style={{ backgroundColor: "oklch(0.94 0.01 240)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <TrendingUp
            className="w-8 h-8 mx-auto mb-3"
            style={{ color: "oklch(0.78 0.16 75)" }}
          />
          <h3
            className="font-display font-bold text-xl md:text-2xl mb-2"
            style={{ color: "oklch(0.18 0.06 255)" }}
          >
            Ready to take the next step?
          </h3>
          <p className="text-sm mb-6" style={{ color: "oklch(0.5 0.02 240)" }}>
            Browse our latest job openings or contact us for personalized career
            guidance.
          </p>
          <a
            href="https://wa.me/919891331853?text=Hi, I read your blog and would like career guidance."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "oklch(0.18 0.06 255)",
              color: "oklch(0.99 0 0)",
            }}
          >
            Get Career Guidance
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
