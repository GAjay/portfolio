import type { ComponentType } from "react";
import {
  IconBuyMeACoffee,
  IconGitHub,
  IconInstagram,
  IconLinkedIn,
  IconMedium,
  IconTopmate,
  IconYouTube,
} from "@/shared/components/icons/social-icons";
import type { SocialLinkId } from "@/shared/config/site";

type SocialIconComponent = ComponentType<{ className?: string }>;

export const socialLinkIcons: Record<SocialLinkId, SocialIconComponent> = {
  linkedin: IconLinkedIn,
  github: IconGitHub,
  instagram: IconInstagram,
  youtube: IconYouTube,
  medium: IconMedium,
  buyMeACoffee: IconBuyMeACoffee,
  topmate: IconTopmate,
};
