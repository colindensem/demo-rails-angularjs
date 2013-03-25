ActiveAdmin.register User do
  index do

    column :email
    column :current_sign_in_at
    column :last_sign_in_at
    column :sign_in_count
    default_actions
  end


  filter :email

  form do |f|
    f.inputs "User Details" do

      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.buttons
  end

  show do
    attributes_table do

      row :email
      row :authentication_token

      row :current_sign_in_at
      row :last_sign_in_at
      row :sign_in_count
    end
    active_admin_comments
  end
end