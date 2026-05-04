import * as React from "react";
import { Logo } from "@/components/atoms/Logo";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-coffee-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Logo className="invert brightness-0" />
            <Paragraph className="text-coffee-300">
              Transformamos granos seleccionados en experiencias memorables. 
              Tu refugio diario para el café perfecto y la mejor compañía.
            </Paragraph>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-coffee-800 flex items-center justify-center hover:bg-mustard-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-coffee-800 flex items-center justify-center hover:bg-mustard-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-coffee-800 flex items-center justify-center hover:bg-mustard-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-heading font-bold text-xl mb-6 text-mustard-500">Navegación</h4>
            <ul className="flex flex-col gap-4 text-coffee-300 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Nuestro Menú</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contáctanos</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-heading font-bold text-xl mb-6 text-mustard-500">Servicios</h4>
            <ul className="flex flex-col gap-4 text-coffee-300 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Eventos Privados</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Venta de Grano</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cursos Barista</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suscripciones</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-xl mb-6 text-mustard-500">Contacto</h4>
            <div className="flex items-start gap-3 text-coffee-300">
              <MapPin size={20} className="text-mustard-500 shrink-0" />
              <span>Av. Principal 123, Ciudad del Café, CP 45000</span>
            </div>
            <div className="flex items-center gap-3 text-coffee-300">
              <Phone size={20} className="text-mustard-500 shrink-0" />
              <span>+52 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-coffee-300">
              <Mail size={20} className="text-mustard-500 shrink-0" />
              <span>hola@cafearoma.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-coffee-800 text-center text-coffee-500 text-sm">
          <p>© {new Date().getFullYear()} Café Aroma. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
