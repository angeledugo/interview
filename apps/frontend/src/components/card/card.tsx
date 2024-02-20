import styles from './card.module.scss';

/* eslint-disable-next-line */
export interface CardProps {}

export function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    {children}
  </div>
  );
}

export default Card;
