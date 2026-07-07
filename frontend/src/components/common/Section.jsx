import Container from "./Container";

export default function Section({
  children,
  className = "",
  id = "",
}) {
  return (
    <section
      id={id}
      className={`py-24 relative ${className}`}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}