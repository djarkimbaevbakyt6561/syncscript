import {LucideProps} from "lucide-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";

export type ToolBarItemType = {
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  action: () => boolean;
  isActive?: boolean;
  disabled?: boolean;
};
