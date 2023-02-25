import React from "react";

export interface ISidebarCategories {
  id: string;
  children: Children[];
}

interface Children {
  id: string;
  icon: React.ReactElement;
  active: boolean;
  navigateTo: string;
}
