const Service = {
  /**
   * Fetch data from a given URL and return the parsed JSON.
   * @param {string} url - The API endpoint to fetch data from.
   * @returns {Promise<any|null>} - The parsed JSON data or null if an error occurs.
   */
  fetchData: async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null to indicate failure
    }
  },

  // Get site logo.
  getLogo: async () => {
    return await Service.fetchData(import.meta.env.VITE_LOGO_API_URL);
  },

  // Get menu links values.
  getMenuLink: async () => {
    return await Service.fetchData(import.meta.env.VITE_MENU_LINKS_API_URL);
  },

  // Get social links values.
  getSocialLink: async () => {
    return await Service.fetchData(import.meta.env.VITE_SOCIAL_LINKS_API_URL);
  },

  /**
   * Concatenate domain with image path.
   * @param {string} imagePath - The image path to concatenate.
   * @returns {string} - The full image URL.
   */
  getImageUrl: (imagePath) => {
    const staticDomain = import.meta.env.VITE_SITE_DOMEN;
    return `${staticDomain}${imagePath}`;
  },

  // Fetch page title.
  getPageTitle: async () => {
    return await Service.fetchData(import.meta.env.VITE_PAGE_TITLE_API_URL);
  },

  // Fetch important teaser.
  getImportantTeaser: async () => {
    return await Service.fetchData(
      import.meta.env.VITE_IMPORTANT_TEASER_API_URL
    );
  },

  // Fetch other teasers.
  getOtherTeasers: async () => {
    return await Service.fetchData(import.meta.env.VITE_OTHER_TEASER_API_URL);
  },

  // Fetch tutorial design.
  getTutorialDesign: async () => {
    return await Service.fetchData(
      import.meta.env.VITE_OTHER_TUTORIAL_DESIGN_API_URL
    );
  },

  // Fetch first static block.
  getFirstStaticBlock: async () => {
    return await Service.fetchData(
      import.meta.env.VITE_STATIC_BLOCK_1_DESIGN_API_URL
    );
  },

  // Fetch second static block.
  getSecondStaticBlock: async () => {
    return await Service.fetchData(
      import.meta.env.VITE_STATIC_BLOCK_2_DESIGN_API_URL
    );
  },

  // Fetch pilihan editor.
  getPilihanEditor: async () => {
    return await Service.fetchData(
      import.meta.env.VITE_PILIHAN_EDITOR_DESIGN_API_URL
    );
  },

  // Fetch latest articles.
  getLatestArticles: async () => {
    return await Service.fetchData(
      import.meta.env.VITE_LATEST_ARTICLES_API_URL
    );
  },

  // Fetch arsip.
  getArsip: async () => {
    return await Service.fetchData(import.meta.env.VITE_ARSIP_API_URL);
  },

  // Fetch sidebar image.
  getSidebarImage: async () => {
    return await Service.fetchData(import.meta.env.VITE_SIDEBAR_IMAGE_API_URL);
  },

  // Fetch testimonials.
  getTestimonials: async () => {
    return await Service.fetchData(import.meta.env.VITE_TESTIMOIALS_API_URL);
  },
};

export default Service;
