import AreaPage, { areaMetadata } from "@/app/components/landing/AreaPage";

const SLUG = "piano-lessons-davis-county";

export const metadata = areaMetadata(SLUG);

export default function Page() {
  return <AreaPage slug={SLUG} />;
}
