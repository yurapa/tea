import common from './common.json';
import auth from './auth.json';
import navigation from './navigation.json';
import home from './home.json';
import admin from './admin.json';
import products from './products.json';
import cart from './cart.json';
import forms from './forms.json';
import deleteDialog from './delete-dialog.json';
import toast from './toast.json';
import pagination from './pagination.json';
import search from './search.json';

export default {
  Common: common,
  Auth: auth,
  Navigation: navigation,
  HomePage: home,
  AdminNav: admin,
  Products: products,
  Cart: cart,
  Forms: forms,
  DeleteDialog: deleteDialog,
  Toast: toast,
  Pagination: pagination,
  Search: search,
} as const;
