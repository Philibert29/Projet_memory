import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ThemeList from "../components/ThemeList";

test('Affiche le titre "Thèmes de Révision"', () => {
  render(
    <Provider store={store}>
      <ThemeList />
    </Provider>
  );

  expect(screen.getByText("Thèmes de Révision")).toBeInTheDocument();
});
