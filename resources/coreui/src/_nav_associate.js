
export default {
  items: [
    // ///////////////////////////////// USER /////////////////////////////////////////////////////
    // {
    //   name: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW',
    //   },
    // },



    {
      name: 'Profile',
      url: '/profile_associate',
      icon: 'icon-speedometer',
      // badge: {
      //   variant: 'info',
      //   text: 'NEW',
      // },
    },

    {
      name: 'Doctors',
      url: '/doctors',
      icon: 'icon-star',
      children: [
        {
          name: 'Add Doctor',
          url: '/associate_add_doctor',
          icon: 'icon-user',
        },
    
        {
          name: 'List of Doctors',
          url: '/list_associate_doctors',
          icon: 'icon-list',
        },
    
        {
          name: 'List Doctors Accounts',
          url: '/associate_account',
          icon: 'icon-list',
        },
      ],
    },

    {
      name: 'Hospitals',
      url: '/hospitals',
      icon: 'icon-star',
      children: [
        {
          name: 'Add Hospital',
          url: '/associate_add_hospital',
          icon: 'icon-user',
        },
    
        {
          name: 'List of Hospital',
          url: '/list_associate_hospitals',
          icon: 'icon-list',
        },

        {
          name: 'Hospitals Account',
          url: '/associate_hospital_account',
          icon: 'icon-list',
        },
      ],
    },

    {
      name: 'Laboratories',
      url: '/laboratories',
      icon: 'icon-star',
      children: [
        {
          name: 'Add Laboratory',
          url: '/associate_add_lab',
          icon: 'icon-user',
        },
    
        {
          name: 'List of Laboratories',
          url: '/list_associate_labs',
          icon: 'icon-list',
        },

        {
          name: 'Labotories Account',
          url: '/associate_lab_account',
          icon: 'icon-list',
        },
      ],
    },

    {
      name: 'Pharmacies',
      url: '/pharmacies',
      icon: 'icon-star',
      children: [
        {
          name: 'Add Pharmacy',
          url: '/associate_add_pharm',
          icon: 'icon-user',
        },
    
        {
          name: 'List of Pharmacies',
          url: '/list_associate_pharms',
          icon: 'icon-list',
        },

        {
          name: 'Pharmacies Account',
          url: '/associate_pharm_account',
          icon: 'icon-list',
        },
      ],
    },

    {
      name: 'Ports',
      url: '/ports',
      icon: 'icon-star',
      children: [
        {
          name: 'Add Port',
          url: '/associate_add_port',
          icon: 'icon-user',
        },
    
        {
          name: 'List of Ports',
          url: '/list_associate_ports',
          icon: 'icon-list',
        },

        {
          name: 'Port Account',
          url: '/associate_port_account',
          icon: 'icon-list',
        },
      ],
    },


    // {
    //   name: 'Spread the Love',
    //   url: '/spread_the_love',
    //   icon: 'icon-heart',
    // },

    
    
  ],
};
