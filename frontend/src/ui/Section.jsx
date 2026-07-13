import Container from "./Container";

export default function Section({ children }) {
  return (
    <section
      style={{
        padding: "96px 0",
      }}
    >
      <Container>{children}</Container>
    </section>
  );
}