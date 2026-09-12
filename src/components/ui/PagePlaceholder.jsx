import Section from "./Section.jsx";
import SectionHeading from "./SectionHeading.jsx";

function PagePlaceholder({ title }) {
  return (
    <Section>
      <SectionHeading
        title={title}
        description="This page is wired up and ready for content in a future phase."
      />
    </Section>
  );
}

export default PagePlaceholder;
