const Service = {
  // Get site logo.
  getLogo: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_LOGO_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch logo");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching logo:", error);
      return null;
    }
  },

  // Get menu links values.
  getMenuLink: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_MENU_LINKS_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch menu links");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching menu links:", error);
      return null;
    }
  },

  // Get social links values.
  getSocialLink: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SOCIAL_LINKS_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch social links");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching social links:", error);
      return null;
    }
  },

  // Concatenate domain with image path.
  getImageUrl: (imagePath) => {
    const staticDomain = import.meta.env.VITE_SITE_DOMEN;
    return `${staticDomain}${imagePath}`;
  },

  getPageTitle: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_PAGE_TITLE_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch page title");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching page title:", error);
      throw error;
    }
  },

  getImportantTeser: async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_IMPORTANT_TEASER_API_URL
      );
      if (!response.ok) {
        throw new Error("Failed to fetch important teser");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching important teser:", error);
      throw error;
    }
  },

  getOtherTeasers: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_OTHER_TEASER_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch other teaser");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching other teaser:", error);
      throw error;
    }
  },

  getTutorialDesign: async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_OTHER_TUTORIAL_DESIGN_API_URL
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tutorial design");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tutorial design:", error);
      throw error;
    }
  },

  getFirstStaticBlock: async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_STATIC_BLOCK_1_DESIGN_API_URL
      );
      if (!response.ok) {
        throw new Error("Failed to fetch first static block");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching first static block:", error);
      throw error;
    }
  },

  getSecondStaticBlock: async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_STATIC_BLOCK_2_DESIGN_API_URL
      );
      if (!response.ok) {
        throw new Error("Failed to fetch second static block");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching second static block:", error);
      throw error;
    }
  },

  getPilihanEditor: async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_PILIHAN_EDITOR_DESIGN_API_URL
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pilihan editor");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pilihan editor:", error);
      throw error;
    }
  },

  getLatestArcticles: async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_LATEST_ARTICLES_API_URL
      );
      if (!response.ok) {
        throw new Error("Failed to fetch artikel terbaru");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching artikel terbaru:", error);
      throw error;
    }
  },

  getArsip: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_ARSIP_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch arsip");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching arsip:", error);
      throw error;
    }
  },

  getSidebarImage: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SIDEBAR_IMAGE_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch sidebar image");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching sidebar image:", error);
      throw error;
    }
  },

  getTestimonials: async () => {
    try {
      const response = await fetch(import.meta.env.VITE_TESTIMOIALS_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw error;
    }
  },
};

export default Service;
