import styles from './ErrorMessage.module.scss';

const ErrorMessage = () => {
  return (
    <div className={styles.errorApp}>
      Your request was not successfully. Please verify your connection, or try again later.
    </div>
  );
};

export { ErrorMessage };
