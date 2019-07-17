import { grommet } from "grommet/themes";
import SnackBar from "../../Components/SnackBar/SnackBar";
import { History } from "history";

const RegisterPage = ({ history }: { history: History }) => {
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ show: false, message: "Okay now", variant: "success" });
    
    const size = useContext(ResponsiveContext);

    return (
        <>
            <SnackBar
				show={snackbar.show}
				message={snackbar.message}
				variant={snackbar.variant as any}
				onClose={() => setSnackbar((s) => ({ ...s, show: false }))}
			/>

            <Grommet theme={grommet}>
                <ProgressBar show={loading} />

                <NavBar
					isPc={size === "small"}
					toggleSideBar={true}
				/>


            </Grommet>
        </>
    );
}