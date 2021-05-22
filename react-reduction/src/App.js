
//Librerías
import React, {Fragment, useEffect} from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

//Rutas
import { userRoutes, authRoutes } from './routes/allRoutes';
import Authmiddleware from './routes/Authmiddleware/Authmiddleware';

//Componentes
import { EmptyLayout, MainLayout } from 'components/Layout';

//Estilos
import './styles/reduction.scss';

//Store
import store from './store/index';


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};


const App=props=>{
  
  return(

    <Fragment>
     <Provider store={store}>
        <Router>
          <Switch>
            {authRoutes.map((route, idx)=>(
              <Authmiddleware
                  path={route.path}
                  layout={EmptyLayout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={false}
              />
            ))}

            {userRoutes.map((route,idx)=>(
              <Authmiddleware
                  path={route.path}
                  layout={MainLayout}
                  component={route.component}
                  //isAuthProtected={true}
                  isAuthProtected={false}
                  exact

              />
            ))}

          </Switch>
        </Router>
      </Provider>
    </Fragment>
  )
}



// class AppOld extends React.Component {
//   render() {
//     return (
//       <BrowserRouter basename={getBasename()}>
//         <GAListener>
//           <Switch>
//             <LayoutRoute
//               exact
//               path="/login"
//               layout={EmptyLayout}
//               component={props => (
//                 <AuthPage {...props} authState={STATE_LOGIN} />
//               )}
//             />
//             <LayoutRoute
//               exact
//               path="/signup"
//               layout={EmptyLayout}
//               component={props => (
//                 <AuthPage {...props} authState={STATE_SIGNUP} />
//               )}
//             />

//             <MainLayout breakpoint={this.props.breakpoint}>
//               <React.Suspense fallback={<PageSpinner />}>
//                 <Route exact path="/" component={DashboardPage} />
//                 <Route exact path="/login-modal" component={AuthModalPage} />
//                 <Route exact path="/buttons" component={ButtonPage} />
//                 <Route exact path="/cards" component={CardPage} />
//                 <Route exact path="/widgets" component={WidgetPage} />
//                 <Route exact path="/typography" component={TypographyPage} />
//                 <Route exact path="/alerts" component={AlertPage} />
//                 <Route exact path="/tables" component={TablePage} />
//                 <Route exact path="/badges" component={BadgePage} />
//                 <Route
//                   exact
//                   path="/button-groups"
//                   component={ButtonGroupPage}
//                 />
//                 <Route exact path="/dropdowns" component={DropdownPage} />
//                 <Route exact path="/progress" component={ProgressPage} />
//                 <Route exact path="/modals" component={ModalPage} />
//                 <Route exact path="/forms" component={FormPage} />
//                 <Route exact path="/input-groups" component={InputGroupPage} />
//                 <Route exact path="/charts" component={ChartPage} />
//               </React.Suspense>
//             </MainLayout>
//             <Redirect to="/" />
//           </Switch>
//         </GAListener>
//       </BrowserRouter>
//     );
//   }
// }

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
