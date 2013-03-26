ActiveAdmin.register Site do
  index do

    column :name

    default_actions
  end


  filter :name

  form do |f|
    f.inputs "Site Details" do

      f.input :name

    end
    f.buttons
  end

  show do
    attributes_table do

      row :name

    end
    active_admin_comments
  end
end