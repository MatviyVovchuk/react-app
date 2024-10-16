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
};

export default Service;
