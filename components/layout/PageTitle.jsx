import Breadcrumb from "./Breadcrumb";

/** Grey page-title banner followed by the dark breadcrumb bar, as on the reference site. */
export default function PageTitle({ title, subtitle, breadcrumb }) {
  return (
    <>
      <section className="page-title">
        <div className="container page-title__inner">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
      <Breadcrumb items={breadcrumb || [{ label: title }]} />
    </>
  );
}
