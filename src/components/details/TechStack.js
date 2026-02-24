/**
 * Renders a tech stack list.
 */
export function TechStack({ techStack, prefix = 'detail' }) {
  if (!Array.isArray(techStack) || techStack.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-start items-center gap-1.5 mt-1 w-full">
      {techStack.map((stack, index) => (
        <p key={`${prefix}-tech-stack-${index}`} className="tech-stack">
          {stack}
        </p>
      ))}
    </div>
  );
}

export default TechStack;
