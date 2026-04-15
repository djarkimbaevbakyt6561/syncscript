import {LucideProps} from "lucide-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";

export type Tone =
  | "default"
  | "academic"
  | "business"
  | "casual"
  | "formal"
  | "conversational"
  | "professional"
  | "friendly"
  | "confident"
  | "emotional"
  | "empathetic"
  | "calm"
  | "motivational"
  | "inspirational"
  | "dramatic"
  | "excited"
  | "serious"
  | "creative"
  | "storytelling"
  | "poetic"
  | "descriptive"
  | "humorous"
  | "playful"
  | "childfriendly"
  | "simple"
  | "concise"
  | "detailed"
  | "analytical"
  | "critical"
  | "educational"
  | "explanatory"
  | "persuasive"
  | "assertive"
  | "bold"
  | "urgent"
  | "visionary";

export type ToneIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type ToneType = {
  value: Tone;
  label: string;
  description: string;
  icon: ToneIcon;
  isActive?: boolean;
  disabled?: boolean;
};
