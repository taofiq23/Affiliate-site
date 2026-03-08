import { CapsuleCollection } from "@/components/capsule-collection";
import { CapsuleMediaBreaks } from "@/components/capsule-media-breaks";
import { CapsulePageFlow } from "@/components/capsule-page-flow";

export default function HomePage() {
  return (
    <>
      <CapsulePageFlow />
      <CapsuleCollection />
      <CapsuleMediaBreaks />
    </>
  );
}
