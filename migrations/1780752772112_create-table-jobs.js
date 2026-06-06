export const up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    company_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"companies"',
      onDelete: 'cascade',
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"categories"',
      onDelete: 'cascade',
    },
  });

  // Membuat index untuk mengoptimalkan query yang menggunakan foreign key
  pgm.createIndex('jobs', 'company_id');
  pgm.createIndex('jobs', 'category_id');
};

export const down = (pgm) => {
  pgm.dropTable('jobs');
};