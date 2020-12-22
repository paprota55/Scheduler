import { fetchSchedulerBlocksList } from "../../../features/blocks/blocksSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
}));

const InstructionPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSchedulerBlocksList());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <h6 className={classes.title}>Ustawienia</h6>
        </Grid>
        <Grid item xs={12}>
          <a className={classes.text}>
            {" "}
            W zakładce ustawienia, użytkownik może zmienić swoje hasło, email,
            bądź czas po jakim wydarzenia z harmonogramu będą archiwizowane i
            przenoszone do historii.
          </a>
        </Grid>
        <Grid item xs={12}>
          <h6 className={classes.title}>Zarządzanie blokami</h6>
        </Grid>
        <Grid item xs={12}>
          <a className={classes.text}>
            {" "}
            Podczas zarządzania blokami, użytkownik może zdefiniować swój własny
            blok zajęć. Każdy z bloków powinien mieć unikalną nazwę w ramach
            jednego użytkownika.
          </a>
          <br />
          <br />
          <a className={classes.text}>
            {" "}
            Do każdego z bloków istnieje możliwość dodania notatki w razie
            jakichkolwiek uwag, zastrzeżeń czy po prostu komentarza.{" "}
          </a>
          <br />
          <br />
          <a className={classes.text}>
            {" "}
            Ważne jest, że bloki nie mogą na siebie nachodzić, a więc w momencie
            jeśli mamy już blok zadeklarowany np. od 12.01 do 19.01 to żaden
            inny blok nie może nachodzić na ten przedział datowy.{" "}
          </a>
          <br />
          <br />
          <a className={classes.text}>
            {" "}
            Po dodaniu pierwszego bloku, użytkownik może zobaczyć 3 opcje:</a>
          <br />
          <a className={classes.text}>
            {" "}
            "ZAŁADUJ" - opcja ta ładuje do harmonogramu wszystkie wydarzenia, które zostały utworzone, bądź ich rama godzinowa obejmuje przedział czasowy zadeklarowany w bloku.</a>
          <br />
          <a className={classes.text}>
            {" "}
            "ZMIEŃ" - umożliwia użytkownikowi modyfikację daty, bądź notatki.</a>
          <br />
          <a className={classes.text}>
            {" "}
            UWAGA! - modyfikacja daty bloku, nie wpływa na czas wydarzeń, jeśli zostanie zmieniony czas, to wydarzenia nie mają aktualizowanego czasu na taki w jakim przedziale blokowym zostały utworzone.</a>
          <br />
          <a className={classes.text}>
            {" "}
            "USUŃ" - Usuwa blok, przy którym widnieje przycisk.</a>
          <br />
          <br />
          <a className={classes.text}>
            {" "}
            Opcja "ZAŁADUJ PEŁNY" ładuje do harmonogramu wszystkie wydarzenia użytkownika.</a>
          <br />

        </Grid>
        <Grid item xs={12}>
        <h6 className={classes.title}>Historia</h6>
        </Grid>
        <Grid item xs={12}>
        <a className={classes.text}>
            {" "}
            Zakładka w, której wyświetlane są wszystkie wydarzenia, które zostały zarchiwizowane. Nie można ich modyfikować, są jedynie do wglądu.</a>
          <br />
        </Grid>
        <Grid item xs={12}>
        <h6 className={classes.title}>Harmonogram</h6>
        </Grid>
        <Grid item xs={12}>
        <a className={classes.text}>
            {" "}
            W prawym górnym rogu harmonogramu znajduje się pole do wyboru konkretnego widoku harmonogramu. Dostępne są 3: dzień, tydzień oraz miesiąc.</a>
          <br />
          <br />
          <a className={classes.text}>
            {" "}
            Po lewej stronie mamy, przycisk "DZISIAJ", który przenosi użytkownika w harmonogramie do dzisiejszej daty.</a>
          <br />
          <a className={classes.text}>
            {" "}
            Obok przycisku znajduje się data z aktualnie przeglądanym tygodniem oraz dwoma przyciskami do przesuwania o tydzień w przód oraz tydzień w tył.</a>
          <br />
          <a className={classes.text}>
            {" "}
            Jako początkowy punkt harmonogramu brana jest pod uwagę dzisiejsza data.</a>
          <br />
          <br/>
          <a className={classes.text}>
            {" "}
            Aby utworzyć nowe wydarzenie w harmonogramie, należy dwukrotnie kliknąć na którąkolwiek komórkę na nim. Otworzy się wtedy menu dodawania, bądź edycji wydarzenia.</a>
          <br />
          <br/>
          <a className={classes.text}>
            {" "}
            Użytkownik podczas tworzenia wydarzenia może wybrać tytuł, czy wydarzenie ma być całodniowe, czy ma się powtarzać.</a>
          <br />
          <a className={classes.text}>
            {" "}
            Dodatkowo może podać notatki do wydarzenia, rodzaj wydarzenia oraz miejsce występowania wydarzenia, stauts nadawany jest automatycznie.</a>
          <br />
          <br/>
          <a className={classes.text}>
            {" "}
            Wybór daty oraz godziny odbywa się poprzez automatyczne uzupełnienie pola, bądź użytkownik może zdefiniować swoje nie związane z datą, która została zaznaczona.</a>
          <br />
          <br/>
          <a className={classes.text}>
            {" "}
            Po wyborze powtarzania wydarzenia, ukazują się dodatkowe opcje. Użytkownik może wybrać, czy wydarzenie ma się powtarzać codziennie, co tydzień, co miesiąc czy co rok.</a>
          <br />
          <a className={classes.text}>
            {" "}
            W każdej z opcji należy uzupełnić koniec powtarzania, który może występować: cały czas, po określonej liczbie powtórzeń (np. tygodni) lub podać konkretną datę zakończenia.</a>
          <br />
          <a className={classes.text}>
            {" "}
            W przypadku tygodni do wyboru są jeszcze dni w których ma się powtarzać. W miesiącu w którym dniu miesiąca, a w roku czy co każdą konkretną date czy np. czwarty piątek grudnia.</a>
          <br />
          <br/>
          <a className={classes.text}>
            {" "}
            W momencie zaznaczenia wydarzenia powtarzającego oraz wybrania konkretnego bloku, po stronie serwera wykonywane są obliczenia, które ustalają końcową oraz początkową datę.</a>
          <br />
          <a className={classes.text}>
            {" "}
            W momencie jeśli wychodzą one poza obręb bloku. Obliczana jest dodatkowo data od której liczony będzie czas do archiwizacji wydarzenia.</a>
          <br />
          <br/>
          <a className={classes.text}>
            {" "}
            Wydarzenia można edytować, również przeciągając klocik na makiecie harmonogramu, należy się liczyć z tym, że wtedy wybierana jest opcja jako bezblokowe wydarzenie.</a>
          <br />
          <a className={classes.text}>
            {" "}
            Wtedy nie wydarzenie nie będzie już przeliczane jako wydarzenie blokowe ale jako wydarzenie bezblokowe.</a>
          <br />
          <br/>
          <a className={classes.text}>
            {" "}
            Istnieje funkcja, która jest jeszcze wersją [BETA], która podczas zmiany wydarzenia, pyta czy chcemy wybrane oraz podążające.</a>
          <br />
          <a className={classes.text}>
            {" "}
            W obecnej fazie funkcja ta dzieli wydarzenie na dwa, natomiast wydarzenie występujące przed ma ustawiony czas zakończenia na dzisiejszą datę, bądź swoją jeśli występuje po dzisiaj.</a>
          <br />
          <a className={classes.text}>
            {" "}
            Natomiast drugie wydarzenie jest zmieniane na takie jakie chcieliśmy uzyskać.</a>
          <br />
          <br/>
        </Grid>
      </Grid>
    </div>
  );
};

export default InstructionPage;
