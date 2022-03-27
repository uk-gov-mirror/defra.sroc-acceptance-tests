import AdminMenu from './menus/admin_menu'
import AnnualBillingMenu from './menus/annual_billing_menu'
import BasePage from './base_page'
import RegimeMenu from './menus/regime_menu'
import TransactionsMenu from './menus/transactions_menu'
import UserMenu from './menus/user_menu'

class BaseAppPage extends BasePage {
  // Menus

  static get adminMenu () {
    return AdminMenu
  }

  static get annualBillingMenu () {
    return AnnualBillingMenu
  }

  static get regimeMenu () {
    return RegimeMenu
  }

  static get transactionsMenu () {
    return TransactionsMenu
  }

  static get userMenu () {
    return UserMenu
  }
}

export default BaseAppPage
