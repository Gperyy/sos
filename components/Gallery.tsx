import React from "react";
import { ExternalLink, Heart } from "lucide-react";
import { GalleryItem } from "../types";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdXODYt0P9m7FouvS5e_7i6tjed_1LDo8GbSgyIv7f7ZXwU2FrkP9bn8rqEvpf_g4GKbcBjmUAMUQH763P_TeBvoolF7sLgZcUFrpQ-KZhgh-9TyLHMdJQmhYK-cYBkDgh0JepMDtVgDG2DftHFQm4eIX2wO8XWS2H1CVvZ-jdz2_TUosfWZmag5oGw3KwFJWXQq6q7iDHIYe__0nWmoPKLeYem6BKRbGByx62SRpeL3obZ7wL32AY4VlxPDjGw0jNg7drRHLWKE0",
    alt: "Vertical view of a red biplane climbing straight up into a blue sky"
  },
  {
    id: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfRAICK8zane0A9hqus2sN9uWGY7Efqhq4hbgDi8VjmiygcT2G-Stc4yDok2FAUISkFH1Nvb-ay13RzuJsYWbcQn1v7SBwfpYSx8_Jh-a7mWRL3vRrT1EGif-TLQsvRmV7B5ND9-zSLRVAett6ujGMa2EcfkH5KcQIPznEBYVUs4oyDRhHX3TRDmRAjQ18zvrOvGgb4QYAe_crjrdXp9pmwd8eEAyCfRj-B5T0AbGH07bfGCIfKOPf8A6XAzRfGOZ14N3ixZJw3CI",
    alt: "Semin Öztürk Şener standing next to her plane waving to the crowd"
  },
  {
    id: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUQUwQmYmdJa3iv3cacJfkR8k8XZWI6MmztazvTV_oILp_0RkPWA3mI9XV7gcrMJZY2_hNxl2jaRVjBilQJtUORwydOZjAnVrJkX0F1rSHLAoTtC16moOOV8y-tP2h7BG1EXwoKxcOnPguchqEu2gnzLZo5TTdICrtOp2ZvWFl5TX_vsJ5SdqCCTKoSShnYJYho1MRsAHP29RJr-hXyRl_WhsjNESbxvUzEX53HK_cQ35AlUKCihVy2czyqoSnAH90T3RxoFzLAlw",
    alt: "Cockpit view looking out over the wing during flight"
  },
  {
    id: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCal4pdqjihAt0I7sON49gvAQ6Lejm6hNzL74PwSo122JQKbrUuw82VBAJ4Bx99GM8HPr2BfJFIfY1hoPt-u1CwSiLKV-MojXlFT3lZ7-4LViVASz7MtncwWQjb64En6WFijHCf3SF2420cX33Q6UlCRXBYxIPnnhjJ45Pw-OlsrxkP-BSIAfZgBxoqeadv3qV3ESCoDtMRU_ToOzP9ilDuM8-koRJ7tjL2f00rilLt14ZkmLS91es4uBah-0CgP1S1NvSIahKy-dQ",
    alt: "Biplane performing a loop with smoke trail forming a circle"
  }
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative">
      <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="h-10 w-2 bg-[#FF542E] transform skew-x-[-15deg] shadow-[0_0_15px_#ff542e]"></div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[#181210] dark:text-white">
              Gallery
            </h2>
          </div>
          <a
            href="https://instagram.com"
            className="text-[#FF542E] hover:text-[#ff6b4a] font-bold italic text-sm flex items-center gap-1 group"
          >
            @semin_ozturk_sener
            <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square overflow-hidden relative group cursor-pointer shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:shadow-[#FF542E]/20 hover:z-10"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-[#FF542E]/20 transition-colors z-10 flex items-center justify-center border-4 border-transparent group-hover:border-[#FF542E]/50">
                <Heart className="text-white w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md transform scale-0 group-hover:scale-100 duration-300" />
              </div>
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                style={{ backgroundImage: `url("${item.image}")` }}
                role="img"
                aria-label={item.alt}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;