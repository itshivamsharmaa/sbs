"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SalonLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Glow Like Never Before ✨
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Premium salon services tailored for your beauty. Book your appointment
          today and experience transformation.
        </p>
        <Button size="lg">Book Appointment</Button>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {["Hair Styling", "Bridal Makeup", "Skin Treatment"].map(
            (service) => (
              <Card key={service} className="rounded-2xl shadow-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-medium mb-2">{service}</h3>
                  <p className="text-sm text-muted-foreground">
                    High-quality professional service tailored for you.
                  </p>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-muted py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium">Expert Artists</h4>
            <p className="text-sm text-muted-foreground">
              Skilled professionals with years of experience.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Premium Products</h4>
            <p className="text-sm text-muted-foreground">
              Only top-quality brands used for your care.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Hygienic & Safe</h4>
            <p className="text-sm text-muted-foreground">
              Clean, sanitized, and customer-first environment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready for Your Transformation?
        </h2>
        <p className="text-muted-foreground mb-6">
          Book your appointment now and let us take care of your beauty.
        </p>
        <Button size="lg">Book Now</Button>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-6 text-center text-sm">
        © 2026 Your Salon. All rights reserved.
      </footer>
    </div>
  );
}

