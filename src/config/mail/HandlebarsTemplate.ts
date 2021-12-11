import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

class HandlebarsTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const template = await fs.promises.readFile(file, { encoding: 'utf-8' });
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsTemplate;
