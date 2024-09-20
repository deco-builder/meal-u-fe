import styles from './checkout.module.css';

interface CheckoutDetailsCardProps {
    data1: string;
    data2: string;
    button: string;
}

const CheckoutDetailsCard: React.FC<CheckoutDetailsCardProps> = ({data1, data2, button}) => {
    return (
        <div className={styles.card}>
          <div className={styles.card_2_contents}>
            <div className={styles.column}>
              <div className={styles.card_title}>
                {data1}
              </div>
              <div>
                {data2}
              </div>
            </div>

            <div className={styles.column}>
              <p className={styles.clickable_word}>
                {button}
              </p>
            </div>
          </div>
        </div>
    )
}

export default CheckoutDetailsCard;