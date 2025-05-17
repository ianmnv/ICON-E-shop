import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.slider__loading}>
      <div className={styles.loading__spinner}></div>
      <p>Loading...</p>
    </div>
  );
}
